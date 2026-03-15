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
    const drafts = await client.fetch('*[_type == "caseStudy" && _id in path("drafts.**")]');
    const published = await client.fetch('*[_type == "caseStudy" && !(_id in path("drafts.**"))]');
    
    console.log('--- DRAFTS ---');
    console.log(JSON.stringify(drafts.map(d => ({ id: d._id, title: d.title })), null, 2));
    
    console.log('--- PUBLISHED ---');
    console.log(JSON.stringify(published.map(d => ({ id: d._id, title: d.title })), null, 2));
    
    // Let's look closely at Dominating Local Healthcare Search
    const specificDraft = await client.fetch('*[_id == "drafts.cRCWWHCoYT1iLGWlk4Ryms"][0]');
    console.log('\n--- DOMINATING LOCAL HEALTHCARE SEARCH DRAFT ---');
    console.log(JSON.stringify(specificDraft, null, 2));
  } catch(e) {
    console.error(e);
  }
}

run();
