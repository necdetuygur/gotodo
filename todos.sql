use basedata1;

go
drop table todos;

go
CREATE TABLE [dbo].[Todos]
(
    [ID]      INT IDENTITY (1, 1) NOT NULL,
    ---
    Detail    NVARCHAR(256)       NULL,
    Completed bit                 NULL,
    ---
    CONSTRAINT [PK_ID] PRIMARY KEY CLUSTERED ([ID]) WITH FILLFACTOR = 80 ON [PRIMARY]
) ON [PRIMARY]
  WITH (DATA_COMPRESSION = NONE)
GO
INSERT INTO Todos (Detail, Completed)
VALUES ('test1', 0);

go
SELECT Id,
       Detail,
       Completed
FROM Todos