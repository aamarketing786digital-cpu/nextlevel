const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'yhqmz717',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skgcO3B5trRLJ1rqyqbvCZ6U4v4s4IQAgFinpHzA6CKf9nK5gaBSX9ocrbCCdT0Tdt8WWvoEom2BP1Y5KXhOhKMG93JMIlkCU5HEAxLHxwlDoDNdo0thXnFIawacNVPkXbCE2wUgVUiXGVEKaXrvR8zQS4iD123h4wrqBHjjBAkPnWqh1WR1',
  useCdn: false
});

async function run() {
  try {
    // Fetch both published and draft documents
    const cases = await client.fetch('*[_type == "caseStudy"]');
    
    for (const doc of cases) {
      let needsPatch = false;
      const patchedResults = [];
      const patchedGallery = [];
      const patchedChallenge = [];
      const patchedSolution = [];
      
      // Patch Results with _type
      if (doc.results && Array.isArray(doc.results)) {
        for (const item of doc.results) {
          if (!item._type || item._type !== 'keyResult') {
            item._type = 'keyResult';
            needsPatch = true;
          }
          patchedResults.push(item);
        }
      }
      
      // Patch Gallery with _type
      if (doc.gallery && Array.isArray(doc.gallery)) {
        for (const item of doc.gallery) {
           if (!item._type || item._type !== 'image') {
            item._type = 'image';
            needsPatch = true;
          }
          patchedGallery.push(item);
        }
      }
      
      // Patch Challenge Block Content
      if (doc.challenge && Array.isArray(doc.challenge)) {
      	for (const item of doc.challenge) {
           if (!item._type) {
            item._type = 'block';
            needsPatch = true;
          }
          patchedChallenge.push(item);
        }
      }
      
      // Patch Solution Block Content
      if (doc.solution && Array.isArray(doc.solution)) {
      	for (const item of doc.solution) {
          if (!item._type) {
            item._type = 'block';
            needsPatch = true;
          }
          patchedSolution.push(item);
        }
      }

      if (needsPatch) {
        console.log(`Patching _type for Case Study: ${doc.title} (${doc._id})`);
        
        let tx = client.patch(doc._id);
        
        if (doc.results) tx = tx.set({ results: patchedResults });
        if (doc.gallery) tx = tx.set({ gallery: patchedGallery });
        if (doc.challenge) tx = tx.set({ challenge: patchedChallenge });
        if (doc.solution) tx = tx.set({ solution: patchedSolution });
        
        await tx.commit();
        console.log(`Successfully patched ${doc.title}`);
      }
    }
    
    console.log('--- ALL DONE ---');
  } catch(e) {
    console.error(e);
  }
}

run();
