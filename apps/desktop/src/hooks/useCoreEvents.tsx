import { useEffect } from 'react';
import { emit, listen, Event } from '@tauri-apps/api/event';
import { useExplorerStore } from '../store/explorer';

export interface RustEvent {
  kind: string;
  data: any;
}

export function useCoreEvents() {
  useEffect(() => {
    listen('core_event', (e: Event<RustEvent>) => {
      console.log({ e });

      switch (e.payload?.kind) {
        case 'NewFileTypeThumb':
          if (e.payload?.data.icon_created)
            useExplorerStore.getState().nativeIconUpdated(e.payload.data.file_id);
          break;

        default:
          break;
      }
    });
  }, []);
}