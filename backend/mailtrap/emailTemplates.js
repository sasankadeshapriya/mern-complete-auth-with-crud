export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(to right, #2192E2, #2A5E75);
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 32px;
    }
    .verification-code {
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #2192E2;
      text-align: center;
      margin: 32px 0;
      padding: 16px;
      background-color: #f8fafc;
      border-radius: 6px;
      border: 1px dashed #e2e8f0;
    }
    .footer {
      text-align: center;
      color: #64748b;
      font-size: 12px;
      padding: 16px;
      border-top: 1px solid #f1f5f9;
    }
    p {
      margin: 16px 0;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up! Please use the following verification code to complete your registration:</p>
      
      <div class="verification-code">{verificationCode}</div>
      
      <p>This code will expire in 15 minutes for security reasons.</p>
      <p>If you didn't request this verification, please ignore this email.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(to right, #2192E2, #2A5E75);
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 32px;
    }
    .success-icon {
      background-color: #2192E2;
      color: white;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      display: inline-block;
      font-size: 30px;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      color: #64748b;
      font-size: 12px;
      padding: 16px;
      border-top: 1px solid #f1f5f9;
    }
    p {
      margin: 16px 0;
      color: #475569;
    }
    ul {
      margin: 16px 0;
      padding-left: 24px;
    }
    li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We're confirming that your password has been successfully updated.</p>
      
      <div style="text-align: center;">
        <div class="success-icon">✓</div>
      </div>
      
      <p>If you didn't initiate this password reset, please contact our support team immediately.</p>
      <p>For your security, we recommend:</p>
      <ul>
        <li>Using a strong, unique password</li>
        <li>Enabling two-factor authentication</li>
        <li>Regularly updating your password</li>
      </ul>
      <p>Thank you for helping us keep your account secure.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(to right, #2192E2, #2A5E75);
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 32px;
    }
    .reset-button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(to right, #2192E2, #2A5E75);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      color: #64748b;
      font-size: 12px;
      padding: 16px;
      border-top: 1px solid #f1f5f9;
    }
    p {
      margin: 16px 0;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      
      <div style="text-align: center;">
        <a href="{resetURL}" class="reset-button" style="color: white;">Reset Password</a>
      </div>
      
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you didn't make this request, you can safely ignore this email.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our App</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(to right, #2192E2, #2A5E75);
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 32px;
    }
    .footer {
      text-align: center;
      color: #64748b;
      font-size: 12px;
      padding: 16px;
      border-top: 1px solid #f1f5f9;
    }
    p {
      margin: 16px 0;
      color: #475569;
    }
    ul {
      margin: 16px 0;
      padding-left: 24px;
    }
    li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our App, ${name}!</h1>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thank you for joining us! We're thrilled to have you as part of our community.</p>
      
      <p>Here's how to get started:</p>
      <ul>
        <li>Complete your profile setup</li>
        <li>Explore our features</li>
        <li>Connect with other users</li>
      </ul>
      
      <p>If you have any questions or need assistance, our support team is here to help.</p>
      <p>Best regards,<br>The App Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;