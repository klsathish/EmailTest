use Sample

--create table E_User(id int identity(1,1),name nvarchar(50),email nvarchar(50))
--create table E_Email(id int identity(1,1),body nvarchar(MAX),subject nvarchar(100),isRead bit,isDraft bit,isDelete bit)
--create table E_EmailIn(id int identity(1,1),UserId int,EmailId int,FromUserId int)
--create table E_EmailOut(id int identity(1,1),UserId int,EmailId int)
--create table E_Attachment(Id int identity(1,1),Name nvarchar(50),Type nvarchar(50),Condent varbinary(MAX))

--insert into E_User values('sathish','sathish@gamil.com')
--insert into E_User values('aaaa','aaaa@gamil.com')
--insert into E_User values('bbb','bbb@gamil.com')
--insert into E_User values('ccc','ccc@gamil.com')

--insert into E_Email values('Body 1','Subject 1',0,0,0)
--insert into E_Email values('Body 2','Subject 2',1,0,0)
--insert into E_Email values('Body 3','Subject 3',1,0,0)

--insert into E_EmailIn values(1,1,1)
--insert into E_EmailIn values(2,1,1)
--insert into E_EmailIn values(3,1,1)

SPE_GetSpecEmail 1,1
--insert into E_EmailOut values(3,1)

select * from E_User
select * from E_Email
select * from E_EmailIn
select * from E_EmailOut


--delete from E_Email
--delete from E_EmailIn
--delete from E_EmailOut

--alter table E_Email  add date datetime
--alter table E_EmailIn add isDelete bit
--alter table E_EmailOut add  isDelete bit

--update E_EmailOut set isDelete=0
--update E_EmailIn set isDelete=0,isDraft=0,isRead=0
--update E_Email set date=getdate()

--alter table E_Email add isDraft bit
-- GetInEmail 1
--SP_EGetInEmail 2

--SP_EGetInEmail 2
create proc SP_EGetInEmail(@userId int)
As
Begin
	select a.id,a.UserId,a.EmailId,b.email,b.name,a.isDraft,a.isRead,a.isDelete
	from E_EmailIn a 
		join E_User b on a.UserId=b.id 
		join E_Email e on e.id=a.EmailId
	where a.UserId = @userId and a.isDelete <> 1 
End
--SP_EGetOutEmail 1
create proc SP_EGetOutEmail(@userId int)
As
Begin
	select a.id,a.UserId,a.EmailId,b.email,b.name
	from E_EmailOut a 
		join E_User b on a.UserId=b.id  
		join E_Email e on e.id=a.EmailId
	where a.UserId = @userId  and a.isDelete <> 1 
End

--SP_EGetTrashEmail 2
create proc SP_EGetTrashEmail(@userId int)
As
Begin
select a.id,a.UserId,a.EmailId,c.email,c.name from E_EmailIn a join  E_Email b  on b.id=a.EmailId  join E_User c on c.id = a.FromUserId where UserId = @userId and a.isDelete=1
Union
select a.id,a.UserId,a.EmailId,c.email,c.name from E_EmailOut a join  E_Email b  on b.id=a.EmailId join E_User c on c.id = a.UserId  where UserId = @userId and a.isDelete=1
End

-- SPE_InsertEmail 'ooo','33123123','aa@gmail.com','bb@gmail.com'
alter proc SPE_InsertEmail(@subject nvarchar(100),@body nvarchar(MAx),@Sender nvarchar(100),@Receiver nvarchar(100))
As
Begin
	Declare @SenderId int,@ReceiverId int;

	select @SenderId=id from E_User where email = @Sender

	insert into E_Email values(@body,@subject,getdate())
	declare @emailGenId int;
	set @emailGenId = SCOPE_IDENTITY()

	insert into E_EmailOut values(@SenderId,@emailGenId,0)  --Sent

	DECLARE @ind Int
	DECLARE @str VARCHAR(20)
	print @Receiver
	set @Receiver = @Receiver+','
	SET @ind = CharIndex(',',@Receiver)
    WHILE @ind > 0
    BEGIN
            SET @str = SUBSTRING(@Receiver,1,@ind-1)
			print @ind
			print @str
            SET @Receiver = SUBSTRING(@Receiver,@ind+1,LEN(@Receiver)-@ind)
			print @Receiver
			select @ReceiverId=id from E_User where email = @str
            insert into E_EmailIn values(@ReceiverId,@emailGenId,@SenderId,0,0,0)  --inbox
            SET @ind = CharIndex(',',@Receiver)
    END
End

create proc SPE_UpdateReadEmail(@id int,@isRead bit)
As
Begin
	update E_EmailIn set isRead=@isRead where id=@id
End

create proc SPE_UpdateDraftEmail(@id int,@isDraft bit)
As
Begin
	update E_EmailIn set isDraft=@isDraft where id=@id
End

create proc SPE_UpdateDelateEmailIn(@id int,@isDelete bit)
As
Begin
	update E_EmailIn set isDelete=@isDelete where id=@id
End


-- SPE_GetSpecEmail 12,2
create proc SPE_GetSpecEmail(@id int,@UserId int)
As
Begin
	select a.id,a.body,a.subject,b.UserId,b.FromUserId,c.name,c.email as FromEmail,cc.email as ToEmail
	from E_Email a 
		join E_EmailIn b on a.id=b.EmailId 
		join E_User c on c.id=b.FromUserId
		join E_User cc on cc.id=b.UserId
	where b.UserId=@UserId and a.id=@id
End



SP_EGetInEmail 1