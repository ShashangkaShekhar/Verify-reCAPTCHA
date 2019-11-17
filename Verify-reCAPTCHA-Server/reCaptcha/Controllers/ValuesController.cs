using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace reCaptcha.Controllers
{
    [Route("api/[controller]"), Produces("application/json"), EnableCors("AppPolicy")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST: api/Values/Validate
        [HttpPost("[action]")]
        public object Validate([FromBody]object data)
        {
            object result = null; object resdata = null; string recaptchaReactive = string.Empty;
            try
            {
                reactiveForm _reactiveForm = JsonConvert.DeserializeObject<reactiveForm>(data.ToString());
                if (_reactiveForm != null)
                    recaptchaReactive = _reactiveForm.recaptchaReactive;

                //string siteKey = "6Lc8E8MUAAAAAJ6lY4GMJpJesd3_X-b23Xsapaxc";
                string privateKey = "6Lc8E8MUAAAAAKepybg5vyM5BJ6fuducTma2VDZK";
                var client = new System.Net.WebClient();
                var googleReply =  client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", privateKey, recaptchaReactive));
                var captchaResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<ReCaptchaResponse>(googleReply);
                resdata = captchaResponse;
            }
            catch (Exception) { }

            return result = new
            {
                resdata
            };
        }
    }

    public class ReCaptchaResponse
    {
        public bool success { get; set; }
        public string challenge_ts { get; set; }
        public string hostname { get; set; }
        public string[] errorcodes { get; set; }
    }

    public class reactiveForm
    {
        public string exampleInputEmail1 { get; set; }
        public string exampleInputPassword1 { get; set; }
        public string recaptchaReactive { get; set; }
    }
}
