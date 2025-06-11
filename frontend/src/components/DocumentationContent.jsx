import React from 'react';
import { ExternalLink, Copy, Server, Database, Mail, Key } from 'lucide-react';

const DocumentationContent = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const apiRoutes = {
    auth: [
      { method: 'GET', endpoint: '/api/auth/check-auth', description: 'Check authentication status' },
      { method: 'POST', endpoint: '/api/auth/signup', description: 'User registration' },
      { method: 'POST', endpoint: '/api/auth/login', description: 'User login' },
      { method: 'POST', endpoint: '/api/auth/logout', description: 'User logout' },
      { method: 'POST', endpoint: '/api/auth/verify-email', description: 'Verify email address' },
      { method: 'POST', endpoint: '/api/auth/forgot-password', description: 'Request password reset' },
      { method: 'POST', endpoint: '/api/auth/reset-password/:token', description: 'Reset password with token' },
    ],
    products: [
      { method: 'GET', endpoint: '/api/products', description: 'List all products' },
      { method: 'GET', endpoint: '/api/products/:id', description: 'Get product by ID' },
      { method: 'POST', endpoint: '/api/products', description: 'Create new product' },
      { method: 'PUT', endpoint: '/api/products/:id', description: 'Update a product' },
      { method: 'DELETE', endpoint: '/api/products/:id', description: 'Delete a product' },
    ]
  };

  const envVariables = [
    { name: 'MONGO_URI', description: 'MongoDB connection string', example: 'mongodb://localhost:27017/taskmanagement' },
    { name: 'PORT', description: 'Server port number', example: '5000' },
    { name: 'JWT_SECRET', description: 'JWT signing secret', example: 'your-super-secret-jwt-key' },
    { name: 'NODE_ENV', description: 'Node environment', example: 'development' },
    { name: 'MAILTRAP_TOKEN', description: 'Mailtrap API token', example: 'your-mailtrap-token' },
    { name: 'CLIENT_URL', description: 'Actual client URL', example: 'http://localhost:5000' },
  ];

  const models = [
    {
      name: 'User',
      fields: [
        { name: 'email', type: 'String', required: true, unique: true },
        { name: 'password', type: 'String', required: true },
        { name: 'name', type: 'String', required: true },
        { name: 'lastLogin', type: 'Date', default: 'Date.now' },
        { name: 'isVerified', type: 'Boolean', default: false },
        { name: 'restPasswordToken', type: 'String' },
        { name: 'restPasswordExpiresAt', type: 'Date' },
        { name: 'verificationToken', type: 'String' },
        { name: 'verificationExpiresAt', type: 'Date' },
      ]
    },
    {
      name: 'Product',
      fields: [
        { name: 'name', type: 'String', required: true, unique: true },
        { name: 'price', type: 'Number', required: true },
        { name: 'quantity', type: 'Number', required: true },
      ]
    }
  ];

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2192E2] to-[#2A5E75] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-white/90">Complete guide to the MERN Task Management API</p>
        <div className="mt-4 flex items-center space-x-4">
          <a
            href="https://www.postman.com/lively-rocket-124485/workspace/task-management-webapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Postman Collection
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Video Tutorial
          </a>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Server className="w-5 h-5 text-[#2192E2] mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Environment Variables</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 font-medium text-gray-700">Variable</th>
                <th className="text-left p-3 font-medium text-gray-700">Description</th>
                <th className="text-left p-3 font-medium text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody>
              {envVariables.map((env, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-mono text-[#2192E2]">{env.name}</td>
                  <td className="p-3 text-gray-600">{env.description}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-between bg-gray-100 rounded px-2 py-1">
                      <code className="text-sm text-gray-700">{env.example}</code>
                      <button
                        onClick={() => copyToClipboard(env.example)}
                        className="ml-2 p-1 hover:bg-gray-200 rounded"
                      >
                        <Copy className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Routes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Key className="w-5 h-5 text-[#2192E2] mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">API Routes</h2>
        </div>
        <p className="text-gray-600 mb-6">All routes are protected with token validation except signup and login.</p>
        
        {/* Authentication Routes */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Authentication Routes</h3>
          <div className="space-y-2">
            {apiRoutes.auth.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(route.method)}`}>
                    {route.method}
                  </span>
                  <code className="text-sm font-mono text-gray-700">{route.endpoint}</code>
                </div>
                <span className="text-sm text-gray-600">{route.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Routes */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Product Routes</h3>
          <div className="space-y-2">
            {apiRoutes.products.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(route.method)}`}>
                    {route.method}
                  </span>
                  <code className="text-sm font-mono text-gray-700">{route.endpoint}</code>
                </div>
                <span className="text-sm text-gray-600">{route.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Database Models */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Database className="w-5 h-5 text-[#2192E2] mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Database Models</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {models.map((model, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">{model.name} Model</h3>
              <div className="space-y-2">
                {model.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <code className="text-[#2192E2] font-medium">{field.name}</code>
                      <span className="text-gray-500">:</span>
                      <span className="text-gray-700">{field.type}</span>
                    </div>
                    <div className="flex space-x-1">
                      {field.required && (
                        <span className="px-1 py-0.5 bg-red-100 text-red-700 text-xs rounded">Required</span>
                      )}
                      {field.unique && (
                        <span className="px-1 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Unique</span>
                      )}
                      {field.default && (
                        <span className="px-1 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Default</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mailtrap Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Mail className="w-5 h-5 text-[#2192E2] mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Mailtrap Configuration</h2>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-2">mailtrap.config.js</h3>
          <pre className="text-sm text-gray-700 overflow-x-auto">
{`import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const transport = Nodemailer.createTransporter(
  MailtrapTransport({
    token: TOKEN,
  })
);

export const sender = {
  address: "no-reply@hireceylon.com",
  name: "MERN Auth App",
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DocumentationContent;