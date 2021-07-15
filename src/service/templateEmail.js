
module.exports = function templateEmail(){
    return (
        `     
        <h1>Xác nhận đăng ký tài khoản</h1>
        <p> Vui lòng xác nhận đăng ký tài khoản tại 2PQFashion Shop, bằng cách nhấn <a href="http://localhost:8080/confirm/${newUser.confirmedToken}">vào đây</a></p>`
    )
}