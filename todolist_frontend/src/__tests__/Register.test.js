import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../components/Register';  // 根据你项目的路径调整
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

// 模拟 axios 请求
jest.mock('axios');

// 测试类
describe('Register Component', () => {

    // 清除每个测试后重置所有的模拟
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Register form', () => {
        // 渲染组件
        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );

        // 验证表单字段是否渲染
        expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('displays error message when fields are empty', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );

        // 模拟用户点击注册按钮
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // 等待并验证错误信息
        await waitFor(() => {
            expect(screen.getByText(/Please enter all fields/i)).toBeInTheDocument();
        });
    });

    test('calls axios and displays success message on successful registration', async () => {
        // 模拟 axios 的成功响应
        axios.request.mockResolvedValueOnce({ data: 'Success' });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );

        // 模拟输入
        fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

        // 模拟用户点击注册按钮
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // 等待并验证成功信息
        await waitFor(() => {
            expect(screen.getByText(/Register success/i)).toBeInTheDocument();
        });
    });

    test('displays error message when registration fails', async () => {
        // 模拟 axios 的失败响应
        axios.request.mockRejectedValueOnce({
            response: { data: 'Registration failed' },
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Register />
            </MemoryRouter>
        );

        // 模拟输入
        fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

        // 模拟用户点击注册按钮
        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        // 等待并验证失败信息
        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });
});
