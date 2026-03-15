const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'yhqmz717',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

async function run() {
  try {
    const videos = await client.fetch('*[_type == "video"][0..5]{ _id, title, videoType, featured, youtubeUrl, videoId }');
    const cases = await client.fetch('*[_type == "caseStudy"][0..5]{ _id, title, featured }');
    
    console.log('--- VIDEOS ---');
    console.log(JSON.stringify(videos, null, 2));
    
    console.log('--- CASE STUDIES ---');
    console.log(JSON.stringify(cases, null, 2));
  } catch(e) {
    console.error(e);
  }
}

run();
