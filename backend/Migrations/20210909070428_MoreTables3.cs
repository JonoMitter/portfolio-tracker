using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class MoreTables3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_cash_user_User_Id",
                table: "cash");

            migrationBuilder.DropForeignKey(
                name: "FK_crypto_user_User_Id",
                table: "crypto");

            migrationBuilder.DropForeignKey(
                name: "FK_stock_user_User_Id",
                table: "stock");

            migrationBuilder.DropForeignKey(
                name: "FK_super_user_User_Id",
                table: "super");

            migrationBuilder.DropIndex(
                name: "IX_super_User_Id",
                table: "super");

            migrationBuilder.DropIndex(
                name: "IX_stock_User_Id",
                table: "stock");

            migrationBuilder.DropIndex(
                name: "IX_crypto_User_Id",
                table: "crypto");

            migrationBuilder.DropIndex(
                name: "IX_cash_User_Id",
                table: "cash");

            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "super",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "stock",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "crypto",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "cash",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "super",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "stock",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "crypto",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "User_Id",
                table: "cash",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_super_User_Id",
                table: "super",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_stock_User_Id",
                table: "stock",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_crypto_User_Id",
                table: "crypto",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_cash_User_Id",
                table: "cash",
                column: "User_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_cash_user_User_Id",
                table: "cash",
                column: "User_Id",
                principalTable: "user",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_crypto_user_User_Id",
                table: "crypto",
                column: "User_Id",
                principalTable: "user",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_stock_user_User_Id",
                table: "stock",
                column: "User_Id",
                principalTable: "user",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_super_user_User_Id",
                table: "super",
                column: "User_Id",
                principalTable: "user",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
