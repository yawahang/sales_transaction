
using System.ComponentModel.DataAnnotations;

namespace SalesTransaction.Application.Model.Account
{
    public class MvAccount
    {
    }

    public class MvLogin
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }

}
