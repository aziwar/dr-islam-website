// Gallery API Handler
import { GalleryManager } from '../utils/gallery-manager.js';

export async function handleGalleryAPI(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  const galleryManager = new GalleryManager(env);

  // Handle different API endpoints
  switch (path) {
    case '/api/gallery/upload':
      if (request.method === 'POST') {
        return await galleryManager.handleUpload(request);
      }
      break;

    case '/api/gallery/list':
      if (request.method === 'GET') {
        return await listGalleryCases(env);
      }
      break;

    case '/api/gallery/approve':
      if (request.method === 'POST') {
        return await approveCaseForDisplay(request, env);
      }
      break;

    case '/api/gallery/delete':
      if (request.method === 'DELETE') {
        return await deleteGalleryCase(request, env);
      }
      break;

    default:
      return new Response('Not Found', { status: 404 });
  }

  return new Response('Method Not Allowed', { status: 405 });
}