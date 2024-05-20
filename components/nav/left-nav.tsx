import { FileUploadModal } from '../modal/file-upload-modal';
import { SpaceIndicator } from '../space-indicator';

export const LeftNavbar = () => {
  return (
    <aside className='fixed h-full pt-14 w-96'>
      <div className='h-full bg-secondary/50 p-10 flex flex-col justify-between'>
        <FileUploadModal />
        <SpaceIndicator />
      </div>
    </aside>
  );
};
