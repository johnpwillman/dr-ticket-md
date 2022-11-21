export async function load({ url, params }) {
    return {
        url: url,
        slug: params.slug
    }
}