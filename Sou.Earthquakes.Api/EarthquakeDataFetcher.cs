using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Sou.Earthquakes.Api
{
    public class EarthquakeDataProvider
    {
        private HttpClient _client;
        private ILogger<EarthquakeDataProvider> _logger;
        private readonly string _apiKey;

        public EarthquakeDataProvider(HttpClient client, ILogger<EarthquakeDataProvider> logger, IConfiguration config)
        {
            _client = client;
            _client.BaseAddress = new Uri($"https://earthquake.usgs.gov"); //Could also be set in Startup.cs
            _logger = logger;
            _apiKey = config["SimpleCastAPIKey"];
        }

        public async Task<List<string>> GetShows()
        {
            try
            {
                var url = new Uri($"fdsnws/event/1/query.geojson?starttime=1980-01-01%2000:00:00&endtime=1982-12-31%2023:59:59&minmagnitude=2.5&callback=callback&orderby=time", UriKind.Relative);
                _logger.LogWarning($"HttpClient: Loading {url}");
                var res = await _client.GetAsync(url);
                res.EnsureSuccessStatusCode();
                return await res.Content.ReadAsAsync<List<string>>();
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"An error occurred connecting to EarthquakeDataProvider API {ex.ToString()}");
                throw;
            }
        }
    }
}
