using SalesTransaction.Application.DataAccess;
using System;

namespace DebugClassLibrary
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            TestClassLibrary(); // testing DataAccessHelper with console app
        }

        private static void TestClassLibrary()
        {

            DataAccessHelper _da =
            new DataAccessHelper("data source=(localhost);initial catalog=SalesTransaction;packet size=4096");
            _da.GetConnection();
        }
    }
}
