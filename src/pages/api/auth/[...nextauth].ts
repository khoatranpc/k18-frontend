import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from "next-auth/next";
import actionRequest from "@/utils/restApi";
import { METHOD } from "@/global/enum";
import { Action } from "@/global/interface";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'example@email.com' },
                password: { label: 'Password', type: 'text', placeholder: 'Nhập mật khẩu của bạn!' },
            },
            async authorize(credentials, req) {
                // for check token
                // const { email, password } = credentials as { email: string, password: string };
                // const payload: Action = {
                //     payload: {
                //         query: {
                //             body: {
                //                 email,
                //                 password
                //             }
                //         }
                //     }
                // };
                // const data = await actionRequest('/api/v1/account', METHOD.POST, payload);
                return null;
            }
        })
    ],
    callbacks: {
        // Add custom logic for sign-in callback
        async signIn(params) {
            const payload: Action = {
                payload: {
                    query: {
                        body: {
                            ...params
                        }
                    }
                }
            };
            console.log(payload);
            const data = await actionRequest('/api/v1/account', METHOD.POST, payload);
            console.log(data);
            return true;
        },
    }
};
export default NextAuth(authOptions);