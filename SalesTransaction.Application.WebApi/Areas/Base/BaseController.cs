using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace SalesTransaction.Application.WebApi.Areas.Base
{
    [Produces("application/json")]
    [EnableCors("AllowOrigin"), Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class BaseController : Controller
    {

    }
}
