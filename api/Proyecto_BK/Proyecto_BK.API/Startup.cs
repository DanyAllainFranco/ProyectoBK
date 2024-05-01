using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Proyecto_BK.BusinessLogic.Services;

namespace Proyecto_BK.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Proyecto_BK.API", Version = "v1" });
            });
            //services.AddAutoMapper(x => x.AddProfile<MappingProfileExtensions>(), AppDomain.CurrentDomain.GetAssemblies());
            services.DataAcces(Configuration.GetConnectionString("Proyecto_BkConn"));
            services.BusinessLogic();
            services.AddAutoMapper(typeof(Startup));
            services.AddHttpContextAccessor();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Proyecto_BK.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors("AllowSpecificOrigin");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


    }
}
