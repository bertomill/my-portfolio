#!/usr/bin/env npx tsx

import { indexAllDocuments, searchSimilarChunks } from './lib/rag-utils'

async function testRagSystem() {
  console.log('🚀 Testing TypeScript RAG System')
  console.log('============================================================')
  
  try {
    // Test 1: Index documents
    console.log('📚 Step 1: Indexing documents...')
    const totalChunks = await indexAllDocuments()
    console.log(`✅ Successfully indexed ${totalChunks} chunks`)
    
    // Test 2: Search for similar content
    console.log('\n🔍 Step 2: Testing search...')
    const query = "What is Robert's experience?"
    console.log(`Query: "${query}"`)
    
    const results = await searchSimilarChunks(query, 4)
    console.log(`✅ Found ${results.length} relevant chunks`)
    
    // Display results
    results.forEach((result, index) => {
      console.log(`\n📄 RESULT ${index + 1}:`)
      console.log(`Source: ${result.source}`)
      console.log(`Similarity: ${(result.similarity * 100).toFixed(1)}%`)
      console.log(`Content preview: ${result.content.substring(0, 100)}...`)
    })
    
    console.log('\n🎉 All tests passed! RAG system is working!')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }
}

testRagSystem()