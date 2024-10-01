﻿// <auto-generated />
using System;
using Crud.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Crud.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241001123316_Notes")]
    partial class Notes
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("Crud.Server.Models.Attachment", b =>
                {
                    b.Property<int>("AttachmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("TaskManagerTaskId")
                        .HasColumnType("INTEGER");

                    b.HasKey("AttachmentId");

                    b.HasIndex("TaskManagerTaskId");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("Crud.Server.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Crud.Server.Models.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Tags")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("Crud.Server.Models.ShoppingItem", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsPurchased")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Link")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<string>("Priority")
                        .HasColumnType("TEXT");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("ItemId");

                    b.ToTable("ShoppingItems");
                });

            modelBuilder.Entity("Crud.Server.Models.SubTask", b =>
                {
                    b.Property<int>("SubTaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("TaskManagerTaskId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("SubTaskId");

                    b.HasIndex("TaskManagerTaskId");

                    b.ToTable("SubTasks");
                });

            modelBuilder.Entity("Crud.Server.Models.TaskManager", b =>
                {
                    b.Property<int>("TaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DueDate")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsReminderEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Priority")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tags")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("TaskId");

                    b.ToTable("TaskManagers");
                });

            modelBuilder.Entity("Crud.Server.Models.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Amount")
                        .HasColumnType("TEXT");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("ExpenseType")
                        .HasColumnType("INTEGER");

                    b.Property<decimal?>("InstallmentAmount")
                        .HasColumnType("TEXT");

                    b.Property<int?>("InstallmentsPaid")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PaymentMethod")
                        .HasColumnType("TEXT");

                    b.Property<string>("ReceiptImage")
                        .HasColumnType("TEXT");

                    b.Property<int?>("TotalInstallments")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TransactionType")
                        .HasColumnType("TEXT");

                    b.HasKey("TransactionId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Crud.Server.Models.Attachment", b =>
                {
                    b.HasOne("Crud.Server.Models.TaskManager", null)
                        .WithMany("Attachments")
                        .HasForeignKey("TaskManagerTaskId");
                });

            modelBuilder.Entity("Crud.Server.Models.SubTask", b =>
                {
                    b.HasOne("Crud.Server.Models.TaskManager", null)
                        .WithMany("SubTasks")
                        .HasForeignKey("TaskManagerTaskId");
                });

            modelBuilder.Entity("Crud.Server.Models.Transaction", b =>
                {
                    b.HasOne("Crud.Server.Models.Category", "Category")
                        .WithMany("Transactions")
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Crud.Server.Models.Category", b =>
                {
                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("Crud.Server.Models.TaskManager", b =>
                {
                    b.Navigation("Attachments");

                    b.Navigation("SubTasks");
                });
#pragma warning restore 612, 618
        }
    }
}
