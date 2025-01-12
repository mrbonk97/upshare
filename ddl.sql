CREATE TABLE upshare_user (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50),
    email NVARCHAR(100),
    image NVARCHAR(100),
    password_hash NVARCHAR(255),
    oauth_provider NVARCHAR(50),
    oauth_user_id NVARCHAR(255),
    default_folder_id INT,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    is_active BIT DEFAULT 1
);

CREATE TABLE upshare_folder
(
    folder_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    folder_name NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
);

CREATE TABLE upshare_file (
    file_id INT IDENTITY(1,1) PRIMARY KEY,
    folder_id INT NULL,
    user_id INT NOT NULL,
    file_name NVARCHAR(255) NOT NULL,
    file_url NVARCHAR(MAX) NOT NULL,
    file_size BIGINT NULL,
    file_type NVARCHAR(50) NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE upshare_folder_relation (
    relation_id INT IDENTITY(1,1) PRIMARY KEY,
    folder_id INT NOT NULL,
    child_folder_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
)


SELECT * FROM upshare_folder B
LEFT OUTER JOIN upshare_folder_relation A
ON A.folder_id = B.folder_id
WHERE B.child_folder_id IS NULL