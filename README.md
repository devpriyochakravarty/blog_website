

 Gourmet Gatherings - Catering Reservation and Ordering System

 Table of Contents
• Overview
• Features
• Technologies Used
• Project Structure
• Installation
• Usage
• Contributing
• License

Overview

Gourmet Gatherings is a web-based catering reservation and ordering system designed to streamline the process of managing catering services. This application allows users to browse menus, place orders, and manage their accounts, while providing administrators with tools to manage products and orders efficiently.

 Features

1. User Authentication
   • User registration
   • User login
   • Role-based access control (user/admin)

2. Product Management
   • Add new products (admin only)
   • View product list
   • Update product details (admin only)
   • Delete products (admin only)

3. Shopping Cart
   • Add products to cart
   • Remove products from cart
   • View cart contents
   • Calculate total price

4. Order Management
   • Place orders
   • View order history
   • Update order status (admin only)

5. Responsive Design
   • Mobile-friendly interface
   • Adaptive layout for various screen sizes

6. Local Storage
   • Offline data persistence using IndexedDB

 Technologies Used

• HTML5
• CSS3
• JavaScript (ES6+)
• IndexedDB for local storage
• Responsive design techniques

 Project Structure

1. index.html: Main HTML structure
2. style.css: CSS styles for the application
3. app.js: Main JavaScript file containing application logic
4. db.js: Database operations using IndexedDB

 Installation

1. Clone the repository:
   ```
   git clone https://github.com/devpriyochakravarty/blog_website.git
   ```

2. Navigate to the project directory:
   ```
   cd blog_website
   ```

3. Open index.html in a modern web browser.

Note: This application uses client-side storage (IndexedDB) and doesn't require a server to run. However, for security reasons, some browsers may restrict access to IndexedDB when running from a file:// URL. It's recommended to use a local server for development.

 Usage

1. User Workflow:
   • Register a new account or log in
   • Browse the menu
   • Add items to the cart
   • Review cart and place an order
   • View order history

2. Admin Workflow:
   • Log in with admin credentials
   • Manage products (add, update, delete)
   • View and update order statuses

 Contributing

We welcome contributions to improve Gourmet Gatherings. Please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

 License

This project is licensed under the MIT License. See the LICENSE file for details.
