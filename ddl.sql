CREATE TABLE upshare_folder
(
    folder_id INT IDENTITY(1,1) PRIMARY KEY,
    parent_folder_id INT NULL,
    user_id INT NOT NULL,
    folder_name NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
);

CREATE TABLE upshare_file (
    file_id INT IDENTITY(1,1) PRIMARY KEY,
    folder_id INT NOT NULL,
    user_id INT NOT NULL,
    file_name NVARCHAR(255) NOT NULL,
    file_url NVARCHAR(MAX) NOT NULL,
    file_size BIGINT NULL,
    file_type NVARCHAR(50) NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);