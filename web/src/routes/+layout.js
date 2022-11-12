import { redirect } from '@sveltejs/kit'
import Cookies from 'js-cookie'

// export const prerender = true;
export const ssr = false

export async function load({ fetch }) {
    console.log('loading layout')
    
    let apiRoot = `http://127.0.0.1:8000/v1/`

    if (Cookies.get('jwt')) {
        if (Cookies.get('user')) {
            return {
                user: JSON.parse(Cookies.get('user'))
            }
        }
        const response = await fetch(apiRoot + 'users/me', {
            headers: {
                "Authorization": "Bearer " + Cookies.get('jwt')
            }
        })

        if (response.status === 401) {
            //JWT Timed out
            Cookies.remove('jwt')
            Cookies.remove('user')
            throw redirect(303, '/login')
        }

        const user = await response.json()
        Cookies.set('user', JSON.stringify(user))
        return {
            user: user
        }
    }
}
