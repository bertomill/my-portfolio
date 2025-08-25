declare module 'pdf-parse' {
  interface PDFData {
    text: string
    numpages: number
    info: Record<string, unknown>
    metadata: Record<string, unknown>
  }
  
  function pdf(buffer: Buffer): Promise<PDFData>
  export = pdf
}
