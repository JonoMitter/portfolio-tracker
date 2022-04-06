using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class DatePurchased : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Units",
                table: "Stock",
                newName: "units");

            migrationBuilder.RenameColumn(
                name: "Purchase_Price",
                table: "Stock",
                newName: "purchase_price");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Stock",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "Stock",
                newName: "code");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Stock",
                newName: "id");

            migrationBuilder.AddColumn<DateTime>(
                name: "date_purchased",
                table: "Stock",
                type: "DateTime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "date_purchased",
                table: "Stock");

            migrationBuilder.RenameColumn(
                name: "units",
                table: "Stock",
                newName: "Units");

            migrationBuilder.RenameColumn(
                name: "purchase_price",
                table: "Stock",
                newName: "Purchase_Price");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Stock",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "code",
                table: "Stock",
                newName: "Code");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Stock",
                newName: "Id");
        }
    }
}
