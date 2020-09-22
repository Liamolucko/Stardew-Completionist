type FileSystemPermissionMode = "read" | "readwrite";
interface FileSystemPermissionDescriptor extends PermissionDescriptor {
  handle: FileSystemHandle;
  mode?: FileSystemPermissionMode;
}
interface FileSystemHandlePermissionDescriptor {
  mode?: FileSystemPermissionMode;
}
type FileSystemHandleKind = "file" | "directory";
interface FileSystemHandle {
  readonly kind: FileSystemHandleKind;
  readonly name: string;
  isSameEntry(other: FileSystemHandle): Promise<boolean>;
  queryPermission(
    descriptor?: FileSystemHandlePermissionDescriptor,
  ): Promise<PermissionState>;
  requestPermission(
    descriptor?: FileSystemHandlePermissionDescriptor,
  ): Promise<PermissionState>;
}
interface FileSystemCreateWritableOptions {
  keepExistingData?: boolean;
}
interface FileSystemFileHandle extends FileSystemHandle {
  getFile(): Promise<File>;
  createWritable(
    options?: FileSystemCreateWritableOptions,
  ): Promise<FileSystemWritableFileStream>;
}
interface FileSystemGetFileOptions {
  create?: boolean;
}
interface FileSystemGetDirectoryOptions {
  create?: boolean;
}
interface FileSystemRemoveOptions {
  recursive?: boolean;
}
interface FileSystemDirectoryHandle extends FileSystemHandle {
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
  keys(): AsyncIterableIterator<string>;
  values(): AsyncIterableIterator<FileSystemHandle>;
  getFileHandle(
    name: string,
    options?: FileSystemGetFileOptions,
  ): Promise<FileSystemFileHandle>;
  getDirectoryHandle(
    name: string,
    options?: FileSystemGetDirectoryOptions,
  ): Promise<FileSystemDirectoryHandle>;
  removeEntry(
    name: string,
    options?: FileSystemRemoveOptions,
  ): Promise<undefined>;
  resolve(possibleDescendant: FileSystemHandle): Promise<Array<string>>;
}
type WriteCommandType = "write" | "seek" | "truncate";
interface WriteParams {
  type: WriteCommandType;
  size?: number;
  position?: number;
  data?: BufferSource | Blob | string;
}
type FileSystemWriteChunkType = BufferSource | Blob | string | WriteParams;
interface FileSystemWritableFileStream extends WritableStream {
  write(data: FileSystemWriteChunkType): Promise<undefined>;
  seek(position: number): Promise<undefined>;
  truncate(size: number): Promise<undefined>;
}
interface FilePickerAcceptType {
  description?: string;
  accept?: Record<string, string | Array<string>>;
}
interface FilePickerOptions {
  types?: Array<FilePickerAcceptType>;
  excludeAcceptAllOption?: boolean;
}
interface OpenFilePickerOptions extends FilePickerOptions {
  multiple?: boolean;
}
interface SaveFilePickerOptions extends FilePickerOptions {
}
interface DirectoryPickerOptions {
}
declare function showOpenFilePicker(
  options?: OpenFilePickerOptions,
): Promise<Array<FileSystemFileHandle>>;
declare function showSaveFilePicker(
  options?: SaveFilePickerOptions,
): Promise<FileSystemFileHandle>;
declare function showDirectoryPicker(
  options?: DirectoryPickerOptions,
): Promise<FileSystemDirectoryHandle>;
interface DataTransferItem {
  getAsFileSystemHandle(): Promise<FileSystemHandle>;
}
interface StorageManager {
  getDirectory(): Promise<FileSystemDirectoryHandle>;
}
