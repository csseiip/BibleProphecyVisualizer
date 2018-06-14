using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Sou.Earthquakes.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EarthQuakeController : ControllerBase
    {
        // GET: api/EarthQuake
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/EarthQuake/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/EarthQuake
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/EarthQuake/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
