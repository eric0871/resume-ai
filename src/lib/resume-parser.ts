/**
 * Extracts text content from a PDF resume
 */
export async function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse");
    const pdf = await pdfParse(pdfBuffer);
    return pdf.text.trim();
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("PDF解析失败，请确保文件是有效的PDF格式。");
  }
}

/**
 * Extracts text content from a DOCX resume
 */
export async function extractTextFromDOCX(docxBuffer: Buffer): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mammoth = require("mammoth");
    const result = await mammoth.extractRawText({ buffer: docxBuffer });
    return result.value.trim();
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error("DOCX解析失败，请确保文件是有效的Word文档。");
  }
}

/**
 * Alias for extractTextFromPDF
 */
export async function parseResumePDF(buffer: Buffer): Promise<string> {
  return extractTextFromPDF(buffer);
}

/**
 * Extracts text from various resume formats (PDF, DOCX)
 */
export async function extractResumeText(
  file: File | Buffer,
  fileType: string
): Promise<string> {
  const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;

  if (fileType === "application/pdf" || fileType.endsWith(".pdf")) {
    return extractTextFromPDF(buffer);
  }

  if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType.endsWith(".docx")
  ) {
    return extractTextFromDOCX(buffer);
  }

  throw new Error(`不支持的文件格式: ${fileType}。目前支持PDF和DOCX格式。`);
}
