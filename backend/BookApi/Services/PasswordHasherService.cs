using System.Security.Cryptography;
using BookApi.Models;
using Microsoft.AspNetCore.Identity;

namespace BookApi.Services
{
    public sealed class PasswordHasherService : IPasswordHasher<User>
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 100000;
        private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

        public string HashPassword(User user, string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);

            return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
        }

        public PasswordVerificationResult VerifyHashedPassword(User user, string hashedPassword, string providedPassword)
        {
            var parts = hashedPassword.Split('-');

            if(parts.Length != 2)
            {
                return PasswordVerificationResult.Failed;
            }

            byte[] hash = Convert.FromHexString(parts[0]);
            byte[] salt = Convert.FromHexString(parts[1]);

            byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(providedPassword, salt, Iterations, Algorithm, HashSize);

            return CryptographicOperations.FixedTimeEquals(hash, inputHash) ? PasswordVerificationResult.Success : PasswordVerificationResult.Failed;
        }
    }
}