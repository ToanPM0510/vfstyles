import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { changePassword } from '../services/api';

function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await changePassword(formData);
            toast.success(response.data.message || 'Password changed successfully.');
            navigate('/dashboard');
        } catch (error) {
            if (error.response?.data?.errors) {
                const backendErrors = error.response.data.errors;
                let newErrors = {};

                Object.keys(backendErrors).forEach((key) => {
                    newErrors[key.charAt(0).toLowerCase() + key.slice(1)] = backendErrors[key].join(', ');
                });

                setErrors(newErrors);
            }
            else if (error.response?.data?.message) {
                toast.error('Old password is incorrect.');
            }
            else {
                toast.error('Failed to change password. Please try again.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto bg-blue-200 dark:bg-blue-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Đổi mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                {/* Old Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mật khẩu cũ
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800"
                    />
                    {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}

                </div>

                {/* New Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mật khẩu mới
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800"
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-800"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-blue-600"
                    >
                        Đổi mật khẩu
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
