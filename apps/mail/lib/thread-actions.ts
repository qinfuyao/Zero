import { trpcClient } from '@/providers/query-provider';
import { LABELS, FOLDERS } from '@/lib/utils';

export type ThreadDestination = 'inbox' | 'archive' | 'spam' | 'bin' | null;
export type FolderLocation = 'inbox' | 'archive' | 'spam' | 'sent' | 'bin' | string;

export interface MoveThreadOptions {
  threadIds: string[];
  currentFolder: FolderLocation;
  destination: ThreadDestination;
}

export function isActionAvailable(folder: FolderLocation, action: ThreadDestination): boolean {
  if (!action) return false;

  const pattern = `${folder}_to_${action}`;

  switch (pattern) {
    // From inbox rules
    case `${FOLDERS.INBOX}_to_spam`:
      return true;
    case `${FOLDERS.INBOX}_to_archive`:
      return true;
    case `${FOLDERS.INBOX}_to_bin`:
      return true;

    // From archive rules
    case `${FOLDERS.ARCHIVE}_to_inbox`:
      return true;
    case `${FOLDERS.ARCHIVE}_to_bin`:
      return true;

    // From spam rules
    case `${FOLDERS.SPAM}_to_inbox`:
      return true;
    case `${FOLDERS.SPAM}_to_bin`:
      return true;

    default:
      return false;
  }
}

export function getAvailableActions(folder: FolderLocation): ThreadDestination[] {
  const allPossibleActions: ThreadDestination[] = ['inbox', 'archive', 'spam', 'bin'];
  return allPossibleActions.filter((action) => isActionAvailable(folder, action));
}

export async function moveThreadsTo({ threadIds, currentFolder, destination }: MoveThreadOptions) {
  try {
    if (!threadIds.length) return;
    const isInInbox = currentFolder === FOLDERS.INBOX || !currentFolder;
    const isInSpam = currentFolder === FOLDERS.SPAM;
    const isInBin = currentFolder === FOLDERS.BIN;

    let addLabel = '';
    let removeLabel = '';

    switch (destination) {
      case 'inbox':
        addLabel = LABELS.INBOX;
        removeLabel = isInSpam ? LABELS.SPAM : isInBin ? LABELS.TRASH : '';
        break;
      case 'archive':
        addLabel = '';
        removeLabel = isInInbox
          ? LABELS.INBOX
          : isInSpam
            ? LABELS.SPAM
            : isInBin
              ? LABELS.TRASH
              : '';
        break;
      case 'spam':
        addLabel = LABELS.SPAM;
        removeLabel = isInInbox ? LABELS.INBOX : isInBin ? LABELS.TRASH : '';
        break;
      case 'bin':
        addLabel = LABELS.TRASH;
        removeLabel = isInInbox ? LABELS.INBOX : isInSpam ? LABELS.SPAM : '';
        break;
      default:
        return;
    }

    if (!addLabel && !removeLabel) {
      console.warn('No labels to modify, skipping API call');
      return;
    }

    return trpcClient.mail.modifyLabels.mutate({
      threadId: threadIds,
      addLabels: addLabel ? [addLabel] : [],
      removeLabels: removeLabel ? [removeLabel] : [],
    });
  } catch (error) {
    console.error(`Error moving thread(s):`, error);
    throw error;
  }
}
