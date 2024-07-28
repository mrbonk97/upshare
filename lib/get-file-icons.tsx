import Image from "next/image";

export default function getFileIcon(type: string) {
  if (type == "doc" || type == "docx")
    return (
      <Image
        src="/images/file-icons/doc.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  if (
    type == "xls" ||
    type == "xlsx" ||
    type == "xlsm" ||
    type == "csv" ||
    type == "vnd.ms-excel"
  )
    return (
      <Image
        src="/images/file-icons/excel.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  if (
    type == "css" ||
    type == "java" ||
    type == "html" ||
    type == "jsx" ||
    type == "tsx" ||
    type == "js" ||
    type == "ts" ||
    type == "py"
  )
    return (
      <Image
        src="/images/file-icons/javscript.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  if (type == "pdf")
    return (
      <Image
        src="/images/file-icons/pdf.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  if (
    type == "jpg" ||
    type == "jpeg" ||
    type == "webp" ||
    type == "svg+xml" ||
    type == "png"
  )
    return (
      <Image
        src="/images/file-icons/photo-gallery.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  if (type == "ppt" || type == "pptx" || type == "pptm")
    return (
      <Image
        src="/images/file-icons/powerpoint.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  if (type == "plain")
    return (
      <Image
        src="/images/file-icons/txt.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  if (type == "zip" || type == "rar" || type == "7z" || type == "tar")
    return (
      <Image
        src="/images/file-icons/zip.png"
        alt={type}
        width={48}
        height={48}
      />
    );

  return (
    <Image
      src="/images/file-icons/word.png"
      alt={type}
      width={48}
      height={48}
    />
  );
}
