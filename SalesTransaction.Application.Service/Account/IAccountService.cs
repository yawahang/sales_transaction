
using SalesTransaction.Application.Model.Account;

namespace SalesTransaction.Application.Service.Account
{
    public interface IAccountService
    {
        dynamic GetLogin(MvLogin login);
        dynamic GetUserDetail(string json);
    }
}
