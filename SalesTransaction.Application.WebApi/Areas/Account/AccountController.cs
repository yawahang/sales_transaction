using System;
using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Account;
using SalesTransaction.Application.Service.Account;
using SalesTransaction.Application.WebApi.Areas.Base;

namespace SalesTransaction.Application.WebApi.Areas.Account
{
    public class AccountController : BaseController
    {
        private IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] MvLogin login)
        {
            try
            {
                dynamic jsonString = _accountService.GetLogin(login);
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        public IActionResult UserDetail(string json)
        {
            try
            {
                dynamic jsonString = _accountService.GetUserDetail(json);
                return Ok(jsonString); 
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
