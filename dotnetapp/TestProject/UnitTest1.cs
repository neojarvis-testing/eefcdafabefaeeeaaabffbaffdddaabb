using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

[TestFixture]
public class DotnetApplicationTests
{
    private HttpClient _httpClient;
    private string _generatedToken;

    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("http://localhost:8080");
    }

    [Test, Order(1)]
    public async Task Backend_TestRegisterUser()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Generate a unique userName based on a timestamp
        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        string requestBody = $"{{\"id\": 1, \"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ORGANIZER\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("/auth/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }

    [Test, Order(2)]
    public async Task Backend_TestRegisterAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        string uniqueUsername = $"abcd_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        string requestBody = $"{{\"id\": 1, \"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ADMIN\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage response = await _httpClient.PostAsync("auth/register", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        string responseBody = await response.Content.ReadAsStringAsync();
        //Assert.AreEqual("true", responseBody);
    }

    [Test, Order(3)]
    public async Task Backend_TestLoginAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        string uniqueUsername = $"admin_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        string adminRegistrationRequestBody = $"{{\"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ADMIN\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage registrationResponse = await _httpClient.PostAsync("/auth/register", new StringContent(adminRegistrationRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, registrationResponse.StatusCode);

        string adminLoginRequestBody = $"{{\"email\": \"{uniqueEmail}\",\"password\": \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/auth/login", new StringContent(adminLoginRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);
        // Assert or process the login response as needed
    }



    [Test, Order(4)]
    public async Task Backend_TestLoginUser()
    {

        string uniqueId = Guid.NewGuid().ToString();

        string uniqueUsername = $"admin_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        string adminRegistrationRequestBody = $"{{\"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ORGANIZER\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage registrationResponse = await _httpClient.PostAsync("/auth/register", new StringContent(adminRegistrationRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, registrationResponse.StatusCode);
        string requestBody = $"{{\"email\": \"{uniqueEmail}\", \"password\": \"abc@123A\"}}";

        HttpResponseMessage response = await _httpClient.PostAsync("/auth/login", new StringContent(requestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        string responseString = await response.Content.ReadAsStringAsync();
        dynamic responseMap = JsonConvert.DeserializeObject(responseString);

        string token = responseMap.token;

        Assert.IsNotNull(token);
    }

    [Test, Order(5)]
    public async Task Backend_TestAddVenueByAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueUsername = $"admin_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        // Assume you have a valid admin registration method, adjust the request body accordingly
        string adminRegistrationRequestBody = $"{{\"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ADMIN\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage registrationResponse = await _httpClient.PostAsync("/auth/register", new StringContent(adminRegistrationRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, registrationResponse.StatusCode);

        // Now, perform the login for the admin user
        string adminLoginRequestBody = $"{{\"email\": \"{uniqueEmail}\",\"password\": \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/auth/login", new StringContent(adminLoginRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

       string requestBody = "{" +
        "\"venueId\": 1," +
        "\"venueName\": \"Venue Name\"," +
        "\"venueLocation\": \"Venue Location\"" +
        "}";
    _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

    HttpResponseMessage response = await _httpClient.PostAsync("/api/venue", new StringContent(requestBody, Encoding.UTF8, "application/json"));

    Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    string responseString = await response.Content.ReadAsStringAsync();
    Assert.IsNotNull(responseString);
    }

    [Test, Order(6)]
    public async Task Backend_TestGetAllEventsForAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueUsername = $"admin_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        // Assume you have a valid admin registration method, adjust the request body accordingly
        string adminRegistrationRequestBody = $"{{\"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ADMIN\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage registrationResponse = await _httpClient.PostAsync("/auth/register", new StringContent(adminRegistrationRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, registrationResponse.StatusCode);

        // Now, perform the login for the admin user
        string adminLoginRequestBody = $"{{\"email\": \"{uniqueEmail}\",\"password\": \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/auth/login", new StringContent(adminLoginRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);

        Console.WriteLine("admin111" + token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);

        HttpResponseMessage response = await _httpClient.GetAsync("/api/event");

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }


    [Test, Order(7)]
    public async Task Backend_TestGetAllVenueAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueUsername = $"admin_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        // Assume you have a valid admin registration method, adjust the request body accordingly
        string adminRegistrationRequestBody = $"{{\"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ADMIN\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage registrationResponse = await _httpClient.PostAsync("/auth/register", new StringContent(adminRegistrationRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, registrationResponse.StatusCode);

        // Now, perform the login for the admin user
        string adminLoginRequestBody = $"{{\"email\": \"{uniqueEmail}\",\"password\": \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/auth/login", new StringContent(adminLoginRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage response = await _httpClient.GetAsync("/api/venue");
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        // Assert or process the response as needed
    }

    [Test, Order(8)]
    public async Task Backend_TestGetAllBookingsAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueUsername = $"admin_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        // Assume you have a valid admin registration method, adjust the request body accordingly
        string adminRegistrationRequestBody = $"{{\"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ADMIN\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage registrationResponse = await _httpClient.PostAsync("/auth/register", new StringContent(adminRegistrationRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, registrationResponse.StatusCode);

        // Now, perform the login for the admin user
        string adminLoginRequestBody = $"{{\"email\": \"{uniqueEmail}\",\"password\": \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/auth/login", new StringContent(adminLoginRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage response = await _httpClient.GetAsync("/api/booking");
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }
[Test, Order(9)]
    public async Task Backend_TestGetAllPaymentAdmin()
    {
        string uniqueId = Guid.NewGuid().ToString();

        // Use a dynamic and unique userName for admin (appending timestamp)
        string uniqueUsername = $"admin_{uniqueId}";
        string uniqueEmail = $"abcd{uniqueId}@gmail.com";


        // Assume you have a valid admin registration method, adjust the request body accordingly
        string adminRegistrationRequestBody = $"{{\"password\": \"abc@123A\", \"userName\": \"{uniqueUsername}\",\"userRole\": \"ADMIN\",\"email\": \"{uniqueEmail}\"}}";
        HttpResponseMessage registrationResponse = await _httpClient.PostAsync("/auth/register", new StringContent(adminRegistrationRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, registrationResponse.StatusCode);

        // Now, perform the login for the admin user
        string adminLoginRequestBody = $"{{\"email\": \"{uniqueEmail}\",\"password\": \"abc@123A\"}}";
        HttpResponseMessage loginResponse = await _httpClient.PostAsync("/auth/login", new StringContent(adminLoginRequestBody, Encoding.UTF8, "application/json"));

        Assert.AreEqual(HttpStatusCode.OK, loginResponse.StatusCode);
        string responseBody = await loginResponse.Content.ReadAsStringAsync();

        dynamic responseMap = JsonConvert.DeserializeObject(responseBody);

        string token = responseMap.token;

        Assert.IsNotNull(token);
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
        HttpResponseMessage response = await _httpClient.GetAsync("/api/payment");
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
    }


    [TearDown]
    public void TearDown()
    {
        // Cleanup or additional teardown logic if needed.
        _httpClient.Dispose();
    }
}
