// import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

const rotasPublicas = ['/', '/sing-in', '/sing-up'];

export default withAuth(
    async function middleware(req: NextRequestWithAuth) {
        // const token = await getToken({ req });
    },
    {
        pages: {
            signIn: '/sing-in'
        },
        callbacks: {
            authorized: ({ req, token }) => {
                if (rotasPublicas.includes(req.nextUrl.pathname)) {
                    return true;
                }

                return !!token;
            }
        }
    }
);
