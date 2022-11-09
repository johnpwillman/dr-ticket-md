import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ cookies }) {
    cookies.delete('jwt');
    cookies.delete('user');
   
    throw redirect(307, '/login');
  }