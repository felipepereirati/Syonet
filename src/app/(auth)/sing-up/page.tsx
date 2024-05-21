'use client';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import {
    AlertCardPropsContext,
    AlertContext
} from '@/lib/providers/AlertProviderContext';
import { api } from '@/lib/request/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import styles from './page.module.css';

const CreateAccountDataSchema = zod
    .object({
        emailUsuario: zod
            .string()
            .min(1, 'Digite seu Email')
            .email('Email inválido'),
        senhaUsuario: zod
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .refine(
                value =>
                    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(
                        value
                    ),
                {
                    message:
                        'A senha deve conter no mínimo 8 caracteres, um número, uma letra maiúscula e um caractere especial'
                }
            ),
        senhaConfirmaUsuario: zod
            .string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .refine(
                value =>
                    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(
                        value
                    ),
                {
                    message:
                        'A senha deve conter no mínimo 8 caracteres, um número, uma letra maiúscula e um caractere especial'
                }
            )
    })
    .refine(
        (data: { senhaUsuario: string; senhaConfirmaUsuario: string }) =>
            data.senhaUsuario === data.senhaConfirmaUsuario,
        {
            message: 'As senhas não coincidem.',
            path: ['senhaConfirmaUsuario']
        }
    );

type CreateAccountData = zod.infer<typeof CreateAccountDataSchema>;

export default function SingUp() {
    const { push } = useRouter();

    const { handleExibirAlerta } = useContext(AlertContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<CreateAccountData>({
        resolver: zodResolver(CreateAccountDataSchema)
    });

    const handleCreateAccountAsync = async (data: CreateAccountData) => {
        try {
            await api.put(
                '/users',
                {
                    emailUsuario: data.emailUsuario,
                    senha: data.senhaConfirmaUsuario
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const message: AlertCardPropsContext = {
                message: `Usuario ${data.emailUsuario} cadastrado com sucesso`
            };

            handleExibirAlerta(message);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status == 400) {
                    setError(error.response.data.campo, {
                        message: error.response.data.message
                    });
                    return;
                }
            }

            const message: AlertCardPropsContext = {
                message: 'Erro ao criar conta:' + JSON.stringify(error)
            };

            handleExibirAlerta(message);
        }
    };

    const handleCancelar = () => {
        push('/');
    };

    return (
        <>
            <div className={styles.title}>Criar Conta</div>
            <form
                className={styles.inputContainer}
                onSubmit={handleSubmit(handleCreateAccountAsync)}
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

                <Input
                    label="Confirmar Senha"
                    maxLength={8}
                    password
                    {...register('senhaConfirmaUsuario')}
                    fieldError={errors.senhaConfirmaUsuario}
                />
                <div className={styles.buttonContainerCreateAccount}>
                    <Button
                        label="Cancelar"
                        onClick={handleCancelar}
                    />
                    <Button
                        label="Criar Conta"
                        type={'submit'}
                    />
                </div>
            </form>
        </>
    );
}
