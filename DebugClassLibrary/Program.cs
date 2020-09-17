using SalesTransaction.Application.DataAccess;
using System;

namespace DebugClassLibrary
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            TestClassLibrary();
        }

        private static void TestClassLibrary()
        {

            DataAccessHelper _da =
            new DataAccessHelper("data source=10.6.0.226;initial catalog=ZenopleMaster;User ID = aqore; password = aqore@123; persist security info=False;packet size=4096");
            _da.GetConnection();
        }
    }
}
