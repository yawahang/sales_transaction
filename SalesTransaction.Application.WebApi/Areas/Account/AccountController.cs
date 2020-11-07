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
                // get data from database here using GetLogin method of AccountService
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
                // get data from database here using GetUserDetail method of AccountService
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
                // get data from database here using GetAllUserDetail method of AccountService
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
                // get data from database here
                dynamic jsonString = JsonConvert.DeserializeObject("{\n  \"data\": [\n    {\n      \"productId\": 1,\n      \"name\": \"Tshirt\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 2,\n      \"name\": \"Trouser\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 3,\n      \"name\": \"Shoe\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 6,\n      \"name\": \"Belt\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    },\n    {\n      \"productId\": 5,\n      \"name\": \"Cap\",\n      \"rate\": 150,\n      \"quantityStock\": 200\n    }\n  ]\n}");
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        #endregion Product


        #region Invoice
        [HttpGet]
        public IActionResult Invoice(string json)
        {
            try
            {
                // get data from database here
                dynamic jsonString = JsonConvert.DeserializeObject("{\n  \"data\": [\n    {\n      \"invoiceId\": 1,\n      \"invoiceNumber\": \"Inv-1\",\n      \"customer\": \"Aqore Pvt. Ltd\",\n      \"invoiceAmount\": 390,\n      \"invoiceDetail\": [\n        {\n          \"salesId\": 1,\n          \"product\": \"Shoes\",\n          \"quantity\": 2,\n          \"rate\": 120,\n          \"total\": 240\n        },\n        {\n          \"salesId\": 2,\n          \"product\": \"Cap\",\n          \"quantity\": 3,\n          \"rate\": 50,\n          \"total\": 150\n        }\n      ]\n    },\n    {\n      \"invoiceId\": 2,\n      \"invoiceNumber\": \"Inv-2\",\n      \"customer\": \"Avionte Pvt. Ltd\",\n      \"invoiceAmount\": 220,\n      \"invoiceDetail\": [\n        {\n          \"salesId\": 3,\n          \"product\": \"Shoes\",\n          \"quantity\": 1,\n          \"rate\": 120,\n          \"total\": 120\n        },\n        {\n          \"salesId\": 4,\n          \"product\": \"Cap\",\n          \"quantity\": 2,\n          \"rate\": 50,\n          \"total\": 100\n        }\n      ]\n    }\n  ]\n}");
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        #endregion Invoice
    }
}
