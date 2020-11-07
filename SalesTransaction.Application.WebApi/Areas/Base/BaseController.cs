using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace SalesTransaction.Application.WebApi.Areas.Base
{
    // return type of API
    [Produces("application/json")] 
    // Allow Origins for address added in Configuration>AllowOrigin with Route>api/[anycontroller]/[anyaction]/{anyid?}
    [EnableCors("AllowOrigin"), Route("api/[controller]/[action]/{id?}")] 
    [ApiController]
    public class BaseController : Controller
    {

    }
}
