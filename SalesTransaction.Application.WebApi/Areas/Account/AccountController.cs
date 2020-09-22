using System;
using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Account;
using SalesTransaction.Application.Service.Account;
using SalesTransaction.Application.WebApi.Areas.Base;
using Newtonsoft.Json;

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

        [HttpGet]
        public IActionResult AllUserDetail()
        {
            try
            {
                dynamic jsonString = _accountService.GetAllUserDetail();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        #region Product
        [HttpGet]
        public IActionResult Product(string json)
        {
            try
            {
                dynamic jsonString = JsonConvert.DeserializeObject("{\n  \"data\": [\n    {\n      \"productId\": 1,\n      \"name\": \"Tshirt\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 2,\n      \"name\": \"Trouser\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 3,\n      \"name\": \"Shoe\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 6,\n      \"name\": \"Belt\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 5,\n      \"name\": \"Cap\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    }\n  ]\n}");
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        #endregion Product
    }
}
