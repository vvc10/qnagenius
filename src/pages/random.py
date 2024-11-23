def decipher(ciphertext, knownWord):
    
	knownWord_len = len(knownWord)
	ciphertext_len = len(ciphertext)

	for i in range(ciphertext_len - knownWord_len + 1):
    	if ciphertext[i:i+knownWord_len].lower() == knownWord.lower():
			shift = (ord(ciphertext[i]) - ord(knownWord[0])) % 26 
		 	result =[]
		   	for c in ciphertext:
			   if c.isalpha():
				  base = ord('a') if c.islower() else ord('A') 
				  shifted_char = chr((ord(c) - base - shift + 26) % 26 + base)
				  result.append(shifted_char)
			   else:
				  result.append(c)
		   	return ''.join(result)
    return "Invalid"

	

ciphertext = input().strip()
knownWord = input().strip()

result = decipher(ciphertext, knownWord)
print(result)
