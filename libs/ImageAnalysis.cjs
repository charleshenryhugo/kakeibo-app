// import createImageAnalysisClient from '@azure-rest/ai-vision-image-analysis';
// import { AzureKeyCredential } from '@azure/core-auth';
// import * as dotenv from "dotenv";
// dotenv.config();

const createImageAnalysisClient = require('@azure-rest/ai-vision-image-analysis').default;
const {AzureKeyCredential} = require('@azure/core-auth');

require('dotenv').config();

const endpoint = process.env.VISION_ENDPOINT
const key = process.env.VISION_KEY

const credential = new AzureKeyCredential(key)

const client = createImageAnalysisClient(endpoint, credential)

const features = ['Caption', 'Read']

exports.extractTextFromImage = async (imageBuffer) => {
  try {
    const result = await client.path('/imageanalysis:analyze').post({
      body: imageBuffer,
      queryParameters: {
        features,
      },
      contentType: 'application/octet-stream',
    })

    if (result.body.readResult) {
      const block = result.body.readResult.blocks[0]
      const textLines = block.lines.map((line) => line.text)

      return textLines.join('\n')
    }

    return ''
  } catch (error) {
    return error.message
  }
}
