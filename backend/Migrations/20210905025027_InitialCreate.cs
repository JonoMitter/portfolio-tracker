using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    User_Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    Password = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.User_Id);
                });

            migrationBuilder.CreateTable(
                name: "Holding",
                columns: table => new
                {
                    Holding_Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    User_Id = table.Column<Guid>(type: "TEXT", nullable: true),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    Value = table.Column<float>(type: "REAL", nullable: true),
                    Code = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Units = table.Column<float>(type: "REAL", nullable: true),
                    Purchase_Price = table.Column<float>(type: "REAL", nullable: true),
                    Stock_Code = table.Column<string>(type: "TEXT", nullable: true),
                    Stock_Name = table.Column<string>(type: "TEXT", nullable: true),
                    Stock_Units = table.Column<int>(type: "INTEGER", nullable: true),
                    Stock_Purchase_Price = table.Column<float>(type: "REAL", nullable: true),
                    Super_Type = table.Column<string>(type: "TEXT", nullable: true),
                    Super_Value = table.Column<float>(type: "REAL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holding", x => x.Holding_Id);
                    table.ForeignKey(
                        name: "FK_Holding_user_User_Id",
                        column: x => x.User_Id,
                        principalTable: "user",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Holding_User_Id",
                table: "Holding",
                column: "User_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Holding");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
