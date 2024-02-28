/*
  Use Prebuilt Receipt operations with the Azure Form Recognizer client library. 
  Document Intelligence (formerly Form Recognizer) SDKs:
  https://learn.microsoft.com/azure/ai-services/document-intelligence/quickstarts/get-started-sdks-rest-api?pivots=programming-language-javascript
*/

import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer'
import dotenv from 'dotenv'
dotenv.config()

const endpoint = process.env.DOCUMENT_INTELLIGENCE_ENDPOINT
const key = process.env.DOCUMENT_INTELLIGENCE_KEY

export const analyzeReceiptImage = async (imageBuffer) => {
  const credential = new AzureKeyCredential(key)
  const client = new DocumentAnalysisClient(endpoint, credential);

  const poller = await client.beginAnalyzeDocument("prebuilt-receipt", imageBuffer);
  const {
    documents: [result]
  } = await poller.pollUntilDone();

  if (result) {
    return result
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}
