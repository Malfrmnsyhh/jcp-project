# Project Structure

```
├── app
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── Auth
│   │   │   │   ├── AuthenticatedSessionController.php
│   │   │   │   ├── ConfirmablePasswordController.php
│   │   │   │   ├── EmailVerificationNotificationController.php
│   │   │   │   ├── EmailVerificationPromptController.php
│   │   │   │   ├── NewPasswordController.php
│   │   │   │   ├── PasswordController.php
│   │   │   │   ├── PasswordResetLinkController.php
│   │   │   │   ├── RegisteredUserController.php
│   │   │   │   └── VerifyEmailController.php
│   │   │   ├── Controller.php
│   │   │   ├── DashboardController.php
│   │   │   ├── MachineController.php
│   │   │   ├── MaterialCategoryController.php
│   │   │   ├── MaterialController.php
│   │   │   ├── OrderController.php
│   │   │   ├── PortfolioController.php
│   │   │   ├── ProductCategoryController.php
│   │   │   ├── ProductController.php
│   │   │   ├── ProfileController.php
│   │   │   ├── StockItemController.php
│   │   │   └── TestimonialController.php
│   │   ├── Middleware
│   │   │   └── HandleInertiaRequests.php
│   │   └── Requests
│   │       ├── Auth
│   │       │   └── LoginRequest.php
│   │       ├── ProfileUpdateRequest.php
│   │       ├── StoreProductRequest.php
│   │       └── UpdateProductRequest.php
│   ├── Models
│   │   ├── Machine.php
│   │   ├── Material.php
│   │   ├── MaterialCategory.php
│   │   ├── MaterialFinish.php
│   │   ├── MaterialThickness.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── PortfolioItem.php
│   │   ├── Product.php
│   │   ├── ProductCategory.php
│   │   ├── ProductImage.php
│   │   ├── StockItem.php
│   │   ├── Testimonial.php
│   │   └── User.php
│   └── Providers
│       └── AppServiceProvider.php
├── bootstrap
│   ├── cache
│   │   ├── packages.php
│   │   └── services.php
│   ├── app.php
│   └── providers.php
├── config
│   ├── app.php
│   ├── auth.php
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── services.php
│   └── session.php
├── database
│   ├── factories
│   │   └── UserFactory.php
│   ├── migrations
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2026_07_17_121706_create_material_categories_table.php
│   │   ├── 2026_07_17_122106_create_materials_table.php
│   │   ├── 2026_07_17_122643_create_material_thicknesses_table.php
│   │   ├── 2026_07_17_123114_create_material_finishes_table.php
│   │   ├── 2026_07_17_123933_create_product_categories_table.php
│   │   ├── 2026_07_17_124153_create_products_table.php
│   │   ├── 2026_07_17_124824_create_product_images_table.php
│   │   ├── 2026_07_17_162503_create_orders_table.php
│   │   ├── 2026_07_17_165717_create_order_items_table.php
│   │   ├── 2026_07_17_170605_create_portfolio_items_table.php
│   │   ├── 2026_07_17_170915_create_machines_table.php
│   │   ├── 2026_07_17_171222_create_testimonials_table.php
│   │   ├── 2026_07_17_171650_create_stock_items_table.php
│   │   ├── 2026_07_21_173000_add_product_image_to_testimonials_table.php
│   │   ├── 2026_07_21_180000_add_client_name_and_description_to_portfolio_items_table.php
│   │   └── 2026_07_22_131507_add_color_hex_to_materials_table.php
│   ├── seeders
│   │   └── DatabaseSeeder.php
│   └── database.sqlite
├── public
│   ├── favicon.ico
│   ├── index.php
│   └── robots.txt
├── resources
│   ├── css
│   │   └── app.css
│   ├── js
│   │   ├── Components
│   │   │   ├── Sections
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Faq.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Machines.jsx
│   │   │   │   ├── Materials.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Order.jsx
│   │   │   │   ├── Portfolio.jsx
│   │   │   │   └── Testimonials.jsx
│   │   │   └── UI
│   │   │       ├── ApplicationLogo.jsx
│   │   │       ├── Checkbox.jsx
│   │   │       ├── DangerButton.jsx
│   │   │       ├── Dropdown.jsx
│   │   │       ├── InputError.jsx
│   │   │       ├── InputLabel.jsx
│   │   │       ├── MaterialCard.jsx
│   │   │       ├── MaterialDetailModal.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── NavLink.jsx
│   │   │       ├── PrimaryButton.jsx
│   │   │       ├── ResponsiveNavLink.jsx
│   │   │       ├── SecondaryButton.jsx
│   │   │       ├── Stepper.jsx
│   │   │       └── TextInput.jsx
│   │   ├── data
│   │   │   ├── materials.jsx
│   │   │   └── produk.jsx
│   │   ├── Layouts
│   │   │   ├── AuthenticatedLayout.jsx
│   │   │   ├── GuestLayout.jsx
│   │   │   └── MainLayout.jsx
│   │   ├── Pages
│   │   │   ├── Admin
│   │   │   │   ├── Machines
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   ├── MaterialCategories
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   ├── Materials
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   ├── Orders
│   │   │   │   │   ├── Index.jsx
│   │   │   │   │   └── Show.jsx
│   │   │   │   ├── Portfolio
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   ├── ProductCategories
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   ├── Products
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   ├── Stocks
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   └── Testimonials
│   │   │   │       ├── Create.jsx
│   │   │   │       ├── Edit.jsx
│   │   │   │       └── Index.jsx
│   │   │   ├── Auth
│   │   │   │   ├── ConfirmPassword.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ResetPassword.jsx
│   │   │   │   └── VerifyEmail.jsx
│   │   │   ├── Profile
│   │   │   │   ├── Partials
│   │   │   │   │   ├── DeleteUserForm.jsx
│   │   │   │   │   ├── UpdatePasswordForm.jsx
│   │   │   │   │   └── UpdateProfileInformationForm.jsx
│   │   │   │   └── Edit.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Order.jsx
│   │   │   └── Welcome.jsx
│   │   ├── utils
│   │   │   └── color.js
│   │   └── app.jsx
│   └── views
│       └── app.blade.php
├── routes
│   ├── auth.php
│   ├── console.php
│   └── web.php
├── storage
│   ├── app
│   │   ├── private
│   │   └── public
│   │       ├── images
│   │       │   ├── logo
│   │       │   │   ├── logo16.png
│   │       │   │   ├── logo180.png
│   │       │   │   ├── logo192.png
│   │       │   │   ├── logo32.png
│   │       │   │   ├── logo48.ico
│   │       │   │   └── logo512.png
│   │       │   ├── materials
│   │       │   │   ├── acrylic
│   │       │   │   └── mdf
│   │       │   ├── logo-browser.png
│   │       │   ├── logo.jpeg
│   │       │   └── mesinlaser.png
│   │       ├── machines
│   │       │   └── YrFqxfqtJEwwYYOqCW1VOFLStbzLwc39dC63xTTc.jpg
│   │       ├── portfolio
│   │       │   ├── 7bNOnE5qjmLpQK1A2BKFjCxCbZbYmqRkFA3MUAiC.jpg
│   │       │   └── c8eWlyacN1RvfhQg26S4eCB3Uw1AVuJTvwEp8Wcf.jpg
│   │       ├── products
│   │       │   ├── awHbKbG1MqsOVIXlRPKc66288rsLs3OSQOcdvPJ9.webp
│   │       │   ├── fKTFiNOf7ENLMcSV3mxJw9StnKW3kwlVARZ2eVeb.jpg
│   │       │   ├── ld58LZaDvbSARubuOI1iqjNQFFVaVVRv3u1XsIaW.jpg
│   │       │   ├── NB6IeELMIln5SPVb1mUHGxEdjRyZdCu4fQjR2INP.webp
│   │       │   ├── pjXY5988pEuF4HGml9iFA5xVO66p2zvjZhboRBN9.webp
│   │       │   ├── sLu3bk4nYKQi7Y99AvXBCnLy0D76yOy9qopnETd7.jpg
│   │       │   └── tOGWVze7blreX6hrXYSVvMXErwCWGTtzM8052O75.jpg
│   │       └── testimonials
│   ├── framework
│   │   ├── cache
│   │   │   └── data
│   │   ├── sessions
│   │   │   ├── 29AMdsjwVahxZttPt6IbFtO6LLJ4U3EkH0wr9ILB
│   │   │   ├── cZCONrOLY6wnxRy2hhS4mgfY6zCRUskygTegj1Vz
│   │   │   ├── hNhpC0MwJVazimGEt65Tneq6YBv1fU4n6xvqwssb
│   │   │   └── zxrkbwcLp3qtpqKDkEQMHDZUYI89CAJofySuqxfl
│   │   ├── testing
│   │   └── views
│   │       ├── 0408672032e833f2f7ee83a88286a2e6.php
│   │       ├── 045cecb6e9fc29d7800a01e5c1f305c2.php
│   │       ├── 0b955d1589b21e3c7f217881a7d6f1db.php
│   │       ├── 10c3c8e612fd5cb86cb5f73de0bbb436.php
│   │       ├── 1106bb970c5edcf1085bc638cdd1082b.php
│   │       ├── 131d965e9093f11a5c70e8e850630281.php
│   │       ├── 139eb01a404077926d8b2bd8af9eeffa.php
│   │       ├── 189d14246fe2cd6914c50e727aafb874.php
│   │       ├── 19f7bc4132885d90557ef9ca40a84b0b.php
│   │       ├── 1aa4d261b87e4b15a74f07857e4d12fc.php
│   │       ├── 1e118caab086f5ebd69ee5a9ce46f2e0.php
│   │       ├── 1f60fba682db15f268c688bfa315cc14.php
│   │       ├── 3080b5393de456f7ae1a45b0806c73ea.php
│   │       ├── 395a9da61940962afd876c6f5ddadcc1.php
│   │       ├── 40b8ecf12aea42520cfc40f844ea58e6.php
│   │       ├── 4107eb14c0085729adb17b022ca134f0.php
│   │       ├── 4158b85c2b69f76f5abfcb80af94c00a.php
│   │       ├── 466bba85b26f7ffe38d91f0a7a9a85f7.php
│   │       ├── 4b38c92f2cd85c3be345840a10e37fa7.php
│   │       ├── 5357d14ceeaa51fa652c691b4d7fddd3.php
│   │       ├── 572088317dafa6c3962f84c1a6a10c31.php
│   │       ├── 58272cd96ffe37a886ac2416443d8518.php
│   │       ├── 5c25b8fa43352bda59f36921d3f0c287.php
│   │       ├── 5c297be9f291f2e70a26cd26227fe5ca.php
│   │       ├── 64ea36c5e435aa1a52ee638d7c7cc3be.php
│   │       ├── 6997d076b81397a7381a03dd29e8fb8b.php
│   │       ├── 6d206c2dd1fd27c26b8d01816feee79b.php
│   │       ├── 7883fc1ceb3f1757479b12f5fb29415e.php
│   │       ├── 7d5ecd9578c708d557b7cff28372ce72.php
│   │       ├── 8575edb96f1a2bc2a5bc9741f78543f9.php
│   │       ├── 887c6e27f423bd9e0f766f1da7a78384.php
│   │       ├── 8c28d0af3c91fe0e7ebee7d289403427.php
│   │       ├── 9159dbaca675565406e0b7566e9a24af.php
│   │       ├── 98db082c03c59a69de1fb0a53bad7f6b.php
│   │       ├── 9e41694c421e1bbe9aff0bf7d4d0179f.php
│   │       ├── a073bdbf5bdb075fa3c3bfc8f7fbc900.php
│   │       ├── a472ef54718d92a8ab04b02458bc774f.php
│   │       ├── a71552b4e1fc306bf6e463b722ca1fe4.php
│   │       ├── aad9ecba8a6681baf78960a2a146c5eb.php
│   │       ├── b737516a52e5a5729582d5b34b823b99.php
│   │       ├── b7c32fba2806fccec09f0eb36229fa92.php
│   │       ├── bfaa51b36faa8fd3d05aec881b03fa8e.php
│   │       ├── c0c5fb831163fef80598d38a80cb6488.php
│   │       ├── c8fd7c6dd1f009e376700df3e970da65.php
│   │       ├── ca76e3f92988fddfc0d0f3ab308dfc5d.php
│   │       ├── d50c5de3ed19512eaa68938f13c01430.php
│   │       ├── e157982e8a441935584c6b6a8172c06a.php
│   │       ├── e2eadd02f4140edb5cdb58158c2920cc.php
│   │       ├── efb746abf5a11928cef915a99fcbaba5.php
│   │       ├── f0e5e61f0405b95113737fcfdb8ec51e.php
│   │       ├── f5f1913a74c5447fe1e4b9c6b120de18.php
│   │       ├── f6d45983d4ddb42d5929c8288732be23.php
│   │       ├── facc97058c16f88f93c8d46400b3f95d.php
│   │       ├── fc2617ac385ca4b94e363b33f754de7c.php
│   │       └── fe0ae715da78e097bf10d78ba32a700c.php
│   └── logs
├── tests
│   ├── Feature
│   │   ├── Auth
│   │   │   ├── AuthenticationTest.php
│   │   │   ├── EmailVerificationTest.php
│   │   │   ├── PasswordConfirmationTest.php
│   │   │   ├── PasswordResetTest.php
│   │   │   ├── PasswordUpdateTest.php
│   │   │   └── RegistrationTest.php
│   │   ├── ExampleTest.php
│   │   ├── ProductCategoryPageTest.php
│   │   └── ProfileTest.php
│   ├── Unit
│   │   └── ExampleTest.php
│   └── TestCase.php
├── artisan
├── composer.json
├── composer.lock
├── jsconfig.json
├── package-lock.json
├── package.json
├── phpunit.xml
├── README.md
├── tailwind.config.js
└── vite.config.js
```
