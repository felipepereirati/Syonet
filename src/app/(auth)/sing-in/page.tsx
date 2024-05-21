'use client';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import styles from './page.module.css';

const AccountDataSchema = zod.object({
    emailUsuario: zod.string().min(1, 'Digite seu Usuário'),
    senhaUsuario: zod.string().min(1, 'Digite sua senha')
});

type AccountData = zod.infer<typeof AccountDataSchema>;

export default function SingIn() {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AccountData>({
        resolver: zodResolver(AccountDataSchema)
    });

    const handleSingInAsync = async (data: AccountData) => {
        try {
            const result = await signIn('credentials', {
                emailUsuario: data.emailUsuario,
                senhaUsuario: data.senhaUsuario,
                redirect: false
            });

            if (!result?.ok && result?.error === 'CredentialsSignin') {
                console.log('CredentialsSignin');
                return;
            }

            push(`/${data.emailUsuario}`);
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <form
                className={styles.inputContainer}
                onSubmit={handleSubmit(handleSingInAsync)}
            >
                <Input
                    label="Email"
                    maxLength={25}
                    {...register('emailUsuario')}
                    fieldError={errors.emailUsuario}
                />
                <Input
                    label="Senha"
                    maxLength={8}
                    password
                    {...register('senhaUsuario')}
                    fieldError={errors.senhaUsuario}
                />
                <div className={styles.buttonContainer}>
                    <Button
                        label="Entrar"
                        type={'submit'}
                    />
                </div>
                <div className={styles.criarConta}>
                    <Link
                        href="/sing-up"
                        className={styles.link}
                    >
                        Não tem uma conta? Registre-se.
                    </Link>
                </div>
            </form>
        </>
    );
}
