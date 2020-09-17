
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model.Account;
using SalesTransaction.Application.Service.Account;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace SalesTransaction.Application.Service
{
    public class AccountService : IAccountService
    {
        private readonly DataAccessHelper _da;
        private readonly int _commandTimeout;
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public AccountService(IConfiguration configuration)
        {
            _configuration = configuration;

            dynamic connectionString = _configuration.GetSection("ConnectionString");
            _connectionString = connectionString["DefaultConnection"];

            if (_connectionString != null)
            {
                _da = new DataAccessHelper(_connectionString);
            }

            _commandTimeout = Convert.ToInt32(connectionString["CommandTimeout"]);
        }

        public dynamic GetLogin(MvLogin login)
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                //cmd.CommandType = CommandType.StoredProcedure;
                // cmd.CommandText = "SpUserSel";
                //cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = login;

                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "SELECT (SELECT u.userName,u.password FROM dbo.[User] AS u WHERE u.UserName = '" + login.UserName + "' AND u.Password='" + login.Password
                    + "' FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) AS Json";
                cmd.CommandTimeout = _commandTimeout;

                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (rdr.HasRows)
                        {
                            return _da.GetJson(rdr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
        }

        public dynamic GetUserDetail(string json)
        {
            using (var con = _da.GetConnection())
            {
                var cmd = con.CreateCommand();
                //cmd.CommandType = CommandType.StoredProcedure;
                // cmd.CommandText = "SpPersonSel";
                //cmd.Parameters.Add("@Json", SqlDbType.NChar).Value = json;

                cmd.CommandType = CommandType.Text;
                dynamic jsonNew = JsonConvert.DeserializeObject(json);
                cmd.CommandText = "SELECT (SELECT p.personId,p.firstName,p.lastName FROM dbo.Person AS p WHERE p.PersonId = " + Convert.ToString(jsonNew.personId)
                    + " FOR JSON PATH, WITHOUT_ARRAY_WRAPPER ) AS Json";
                cmd.CommandTimeout = _commandTimeout;

                using (SqlDataReader rdr = cmd.ExecuteReader())
                {
                    try
                    {
                        if (rdr.HasRows)
                        {
                            return _da.GetJson(rdr);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
        }
    }
}
